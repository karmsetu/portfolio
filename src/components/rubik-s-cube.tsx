/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useThree, useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { OrbitControls as OrbitControlsType } from 'three-stdlib';
import * as THREE from 'three';

interface CubeData {
  name: string;
  position: [number, number, number];
  materials: THREE.MeshPhongMaterial[];
}

interface DragState {
  isDragging: boolean;
  startCube: THREE.Mesh | null;
  startPoint: THREE.Vector3 | null;
  startMouse: { x: number; y: number } | null;
}

interface RotatingGroup {
  group: THREE.Group;
  axis: 'x' | 'y' | 'z';
  direction: number;
  cubeNames: string[];
}

const COLORS = [
  0xff0000, // Red - Right face
  0xffa500, // Orange - Left face (changed from green)
  0x0000ff, // Blue - Top face
  0xffff00, // Yellow - Bottom face
  0xffffff, // White - Front face
  0x00ff00, // Green - Back face (changed from cyan)
  0x222222, // Dark Gray - Inner
];

const RubikCube: React.FC<{ toRotate: boolean }> = ({ toRotate }) => {
  const [resetTrigger] = useState(0);

  return (
    <div className="h-full w-full ">
      <Canvas
        // camera={{ position: [2, 2, 5], fov: 75 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <PerspectiveCamera makeDefault position={[1, 1, 3.2]} fov={75} />
        <RubikScene resetTrigger={resetTrigger} toRotate={toRotate} />
      </Canvas>
    </div>
  );
};

const RubikScene: React.FC<{ resetTrigger: number; toRotate: boolean }> = ({
  resetTrigger,
  toRotate,
}) => {
  const { camera, scene, size } = useThree();
  const controlsRef = useRef<OrbitControlsType>(null);
  const cubeRef = useRef<THREE.Group>(null);
  const cubesRef = useRef<{ [key: string]: THREE.Mesh }>({});
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  const [cubes, setCubes] = useState<CubeData[]>([]);
  const [rotatingGroup, setRotatingGroup] = useState<RotatingGroup | null>(
    null
  );
  const [isRotating, setIsRotating] = useState(false);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startCube: null,
    startPoint: null,
    startMouse: null,
  });

  // Initialize materials - FIXED: Create fresh materials for each cube
  const createMaterials = () => {
    return COLORS.map(
      (color) =>
        new THREE.MeshPhongMaterial({
          color,
          shininess: 100,
          specular: 0x222222,
        })
    );
  };

  // Initialize cubes
  useEffect(() => {
    const newCubes: CubeData[] = [];
    // const geometry = new THREE.BoxGeometry(1, 1, 1);

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const cubeMaterials = createMaterials();
          const faceMaterials = initFaces(
            // geometry,
            x,
            y,
            z,
            cubeMaterials
          );
          newCubes.push({
            name: `${x}${y}${z}`,
            position: [x + x / 20, y + y / 20, z + z / 20],
            materials: faceMaterials,
          });
        }
      }
    }
    setCubes(newCubes);
  }, []);

  // Reset camera view
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      camera.position.set(5, 5, 5);
      camera.lookAt(0, 0, 0);
    }
  }, [resetTrigger, camera]);

  // Animation loop for rotation
  useFrame((_, delta) => {
    if (toRotate) {
      cubeRef.current?.rotateX(0.004);
      cubeRef.current?.rotateY(0.004);
    }
    if (isRotating && rotatingGroup) {
      const rotationStep = (Math.PI / 2) * delta * 3; // Faster rotation
      const newProgress = rotationProgress + rotationStep;

      if (newProgress >= Math.PI / 2) {
        // Complete rotation
        rotatingGroup.group.rotation[rotatingGroup.axis] =
          (Math.PI / 2) * rotatingGroup.direction;
        finishRotation();
        setRotationProgress(0);
      } else {
        rotatingGroup.group.rotation[rotatingGroup.axis] =
          newProgress * rotatingGroup.direction;
        setRotationProgress(newProgress);
      }
    }
  });

  const initFaces = (
    // geometry: THREE.BoxGeometry,
    x: number,
    y: number,
    z: number,
    materials: THREE.MeshPhongMaterial[]
  ): THREE.MeshPhongMaterial[] => {
    const localMaterials: THREE.MeshPhongMaterial[] = [
      materials[6],
      materials[6],
      materials[6],
      materials[6],
      materials[6],
      materials[6],
    ];

    // Standard Rubik's Cube color scheme:
    if (x === 1) localMaterials[0] = materials[0]; // Right - Red
    if (x === -1) localMaterials[1] = materials[1]; // Left - Orange
    if (y === 1) localMaterials[2] = materials[2]; // Top - Blue
    if (y === -1) localMaterials[3] = materials[3]; // Bottom - Yellow
    if (z === 1) localMaterials[4] = materials[4]; // Front - White
    if (z === -1) localMaterials[5] = materials[5]; // Back - Green

    return localMaterials;
  };

  // Mouse/Touch event handlers
  const handlePointerDown = (event: MouseEvent | TouchEvent) => {
    if (isRotating) return;

    event.stopPropagation();

    // Disable orbit controls during cube interaction
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }

    const intersection = getCubeIntersection(event);
    if (intersection) {
      setDragState({
        isDragging: true,
        startCube: intersection.object as THREE.Mesh,
        startPoint: intersection.point,
        startMouse: {
          x: (event as MouseEvent).clientX,
          y: (event as MouseEvent).clientY,
        },
      });
    }
  };

  const handlePointerMove = (event: MouseEvent | TouchEvent) => {
    if (!dragState.isDragging || !dragState.startCube || isRotating) return;

    const e = (event as MouseEvent).x
      ? (event as MouseEvent)
      : (event as TouchEvent).changedTouches[0];

    const currentMouse = { x: e.clientX, y: e.clientY };
    const intersection = getCubeIntersection(event);

    if (intersection && dragState.startPoint && dragState.startMouse) {
      // Check if drag distance is sufficient
      const dragDistance = Math.sqrt(
        Math.pow(currentMouse.x - dragState.startMouse.x, 2) +
          Math.pow(currentMouse.y - dragState.startMouse.y, 2)
      );

      if (dragDistance > 10) {
        // Minimum drag distance threshold
        const dx = dragState.startPoint.x - intersection.point.x;
        const dy = dragState.startPoint.y - intersection.point.y;
        const dz = dragState.startPoint.z - intersection.point.z;

        const absX = Math.abs(dx);
        const absY = Math.abs(dy);
        const absZ = Math.abs(dz);

        const limit = 0.2;
        const direction = recognizeDirection(
          dragState.startPoint,
          dx,
          dy,
          dz,
          absX,
          absY,
          absZ,
          limit
        );

        if (direction) {
          startRotation(
            direction.axis,
            direction.direction,
            dragState.startCube
          );
          setDragState((prev) => ({ ...prev, isDragging: false }));
        }
      }
    }
  };

  const handlePointerUp = () => {
    if (controlsRef.current) {
      controlsRef.current.enabled = true;
    }
    setDragState({
      isDragging: false,
      startCube: null,
      startPoint: null,
      startMouse: null,
    });
  };

  const getCubeIntersection = (
    event: MouseEvent | TouchEvent
  ): THREE.Intersection | null => {
    const mouse = new THREE.Vector2();

    if ((event as MouseEvent).clientX !== undefined) {
      // Mouse event
      mouse.x = ((event as MouseEvent).clientX / size.width) * 2 - 1;
      mouse.y = -((event as MouseEvent).clientY / size.height) * 2 + 1;
    } else if ((event as TouchEvent).touches) {
      // Touch event
      mouse.x = ((event as TouchEvent).touches[0].clientX / size.width) * 2 - 1;
      mouse.y =
        -((event as TouchEvent).touches[0].clientY / size.height) * 2 + 1;
    }

    raycaster.setFromCamera(mouse, camera);
    const cubeMeshes = Object.values(cubesRef.current);
    const intersects = raycaster.intersectObjects(cubeMeshes);

    return intersects.length > 0 ? intersects[0] : null;
  };

  const recognizeDirection = (
    startPoint: THREE.Vector3,
    dx: number,
    dy: number,
    dz: number,
    absX: number,
    absY: number,
    absZ: number,
    limit: number
  ): { axis: 'x' | 'y' | 'z'; direction: number } | null => {
    let axis: 'x' | 'y' | 'z' | null = null;
    let direction = 1;

    if (startPoint.x > 1.5) {
      if (absY > limit || absZ > limit) {
        if (absY > absZ) {
          axis = 'z';
          direction = dy < 0 ? 1 : -1;
        } else {
          axis = 'y';
          direction = dz < 0 ? -1 : 1;
        }
      }
    } else if (startPoint.y > 1.5) {
      if (absX > limit || absZ > limit) {
        if (absX > absZ) {
          axis = 'z';
          direction = dx < 0 ? -1 : 1;
        } else {
          axis = 'x';
          direction = dz < 0 ? 1 : -1;
        }
      }
    } else if (startPoint.z > 1.5) {
      if (absX > limit || absY > limit) {
        if (absX > absY) {
          axis = 'y';
          direction = dx < 0 ? 1 : -1;
        } else {
          axis = 'x';
          direction = dy < 0 ? -1 : 1;
        }
      }
    } else if (startPoint.x < -1.5) {
      if (absY > limit || absZ > limit) {
        if (absY > absZ) {
          axis = 'z';
          direction = dy < 0 ? -1 : 1;
        } else {
          axis = 'y';
          direction = dz < 0 ? 1 : -1;
        }
      }
    } else if (startPoint.y < -1.5) {
      if (absX > limit || absZ > limit) {
        if (absX > absZ) {
          axis = 'z';
          direction = dx < 0 ? 1 : -1;
        } else {
          axis = 'x';
          direction = dz < 0 ? -1 : 1;
        }
      }
    } else if (startPoint.z < -1.5) {
      if (absX > limit || absY > limit) {
        if (absX > absY) {
          axis = 'y';
          direction = dx < 0 ? -1 : 1;
        } else {
          axis = 'x';
          direction = dy < 0 ? 1 : -1;
        }
      }
    }

    return axis ? { axis, direction } : null;
  };

  const startRotation = (
    axis: 'x' | 'y' | 'z',
    direction: number,
    clickedCube: THREE.Mesh
  ) => {
    if (isRotating) return;

    setIsRotating(true);
    setRotationProgress(0);

    const clickedPos = clickedCube.position;
    const cubeNames: string[] = [];

    // Create group for rotation
    const group = new THREE.Group();

    // Add cubes in the same layer to the group
    Object.entries(cubesRef.current).forEach(([name, cube]) => {
      let shouldInclude = false;

      if (axis === 'x' && Math.abs(cube.position.x - clickedPos.x) < 0.05) {
        shouldInclude = true;
      } else if (
        axis === 'y' &&
        Math.abs(cube.position.y - clickedPos.y) < 0.05
      ) {
        shouldInclude = true;
      } else if (
        axis === 'z' &&
        Math.abs(cube.position.z - clickedPos.z) < 0.05
      ) {
        shouldInclude = true;
      }

      if (shouldInclude) {
        // Store world position and rotation
        const worldPosition = new THREE.Vector3();
        const worldQuaternion = new THREE.Quaternion();
        cube.getWorldPosition(worldPosition);
        cube.getWorldQuaternion(worldQuaternion);

        // Add to group
        group.attach(cube);

        // Restore world position
        cube.position.copy(worldPosition);
        cube.quaternion.copy(worldQuaternion);

        cubeNames.push(name);
      }
    });

    // Add group to scene
    scene.add(group);

    setRotatingGroup({
      group,
      axis,
      direction,
      cubeNames,
    });
  };

  const finishRotation = () => {
    if (!rotatingGroup) return;

    // Update cube positions after rotation
    rotatingGroup.cubeNames.forEach((cubeName) => {
      const cube = cubesRef.current[cubeName];
      if (cube && cube.parent === rotatingGroup.group) {
        // Get world position after rotation
        const worldPosition = new THREE.Vector3();
        const worldQuaternion = new THREE.Quaternion();
        cube.getWorldPosition(worldPosition);
        cube.getWorldQuaternion(worldQuaternion);

        // Remove from group and add back to scene
        rotatingGroup.group.remove(cube);
        scene.add(cube);

        // Set new position
        cube.position.copy(worldPosition);
        cube.quaternion.copy(worldQuaternion);
      }
    });

    // Remove the group
    scene.remove(rotatingGroup.group);

    setIsRotating(false);
    setRotatingGroup(null);
  };

  // Add event listeners for global mouse/touch events
  useEffect(() => {
    // const canvas = gl.domElement;

    const handleMouseMove = (e: MouseEvent) => handlePointerMove(e);
    const handleMouseUp = () => handlePointerUp();
    const handleTouchMove = (e: TouchEvent) => handlePointerMove(e);
    const handleTouchEnd = () => handlePointerUp();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragState, isRotating]);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={!isRotating && !dragState.isDragging}
        minDistance={3}
        maxDistance={20}
      />

      <ambientLight intensity={0.6} color={0xffffff} />

      <directionalLight
        position={[10, 10, 8]}
        intensity={2.0} // ← Increased from 1.0 → 2.0
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.001}
        color={0xffffff} // ← Pure white (not tinted)
      />

      <directionalLight
        position={[-8, 5, -5]}
        intensity={1.2}
        color={0xf0f0ff} // Slight cool fill (optional)
      />

      <pointLight
        position={[0, 0, -10]}
        intensity={0.8}
        color={0xffffff}
        distance={20}
      />

      {/* Remove or reduce colored point lights — they tint pastels */}
      {/* <pointLight position={[-10, -10, -10]} intensity={1.0} color={0x4488ff} /> */}
      {/* <pointLight position={[0, 10, 0]} intensity={1.0} color={0xff8844} /> */}

      <group ref={cubeRef}>
        {cubes.map((cube) => (
          <mesh
            key={cube.name}
            ref={(el) => {
              if (el) {
                cubesRef.current[cube.name] = el;
              }
            }}
            position={cube.position}
            onPointerDown={handlePointerDown}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[1, 1, 1]} />
            {cube.materials.map((material, index) => (
              <primitive
                key={index}
                object={material}
                attach={`material-${index}`}
              />
            ))}
          </mesh>
        ))}
      </group>
    </>
  );
};

export default RubikCube;
