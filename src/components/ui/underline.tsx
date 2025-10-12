export const Underline = ({ height }: { height?: number }) => (
  <div
    className={` ${
      height ? `w-${height}` : 'w-24'
    } h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full`}
  ></div>
);
