import React from 'react';

interface OptionProps {
  title: string;
  description: string;
  checkid: string;
  completed: boolean;
  onCompletionChange: (id: string, completed: boolean) => void;
  onDeletion : (id: string) => void;
}

const Option: React.FC<OptionProps> = ({ title, description, checkid, completed, onCompletionChange, onDeletion }: OptionProps) => {
  const handleTaskClick = async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    });

    if (response.ok) {
      const newCompleted = !completed;
      onCompletionChange(id, newCompleted);
    } else {
      console.error('Failed to update task');
    }
  };
  return (
    <label
      htmlFor={checkid}
      // onClick={() => handleTaskClick(checkid)}
      className="flex cursor-pointer items-start bg-white gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-green-50"
    >
      <div className="flex items-center">
        <input type="checkbox" defaultChecked={completed} onChange={() => handleTaskClick(checkid)} className="size-4 rounded text-green-700 border-gray-300" id={checkid} />
      </div>

      <div>
        <strong className="text-pretty font-medium text-gray-900">{title}</strong>
        <p className="mt-1 text-pretty text-sm text-gray-700">{description}</p>
      </div>
      <button onClick={() => onDeletion(checkid)} className="ml-auto bg-red-500 text-white rounded p-2">Delete</button>

    </label>
  );
};

export default Option;
