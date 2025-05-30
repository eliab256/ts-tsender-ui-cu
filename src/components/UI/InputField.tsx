interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  large?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function InputField({ label, placeholder, value, type, large, onChange }: InputFieldProps) {
  const inputId = label ? label.toLowerCase().replace(/\s+/g, "-") : "input-field";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-zinc-600 font-medium text-sm">{label}</label>
      {large ? (
        <textarea
          id={inputId}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none resize-none"
        />
      ) : (
        <input
          className={`bg-white py-2 px-3 border border-zinc-300 placeholder:text-zinc-500 text-zinc-900 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
