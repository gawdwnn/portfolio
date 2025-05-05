const CommandLine = ({
  command,
  output,
}: {
  command: string;
  output: string[];
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-2 mb-1">
        <span className="text-green-500">$</span>
        <span>{command}</span>
      </div>
      {output.map((line, i) => (
        <div key={i} className="pl-6 text-neutral-400">
          {line}
        </div>
      ))}
    </div>
  );
};

export default CommandLine;
