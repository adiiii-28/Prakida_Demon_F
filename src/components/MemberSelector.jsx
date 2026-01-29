import { Check } from "lucide-react";

export default function MemberSelector({
  members,
  selectedMembers,
  setSelectedMembers,
}) {
  const toggleMember = (email) => {
    setSelectedMembers((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email],
    );
  };

  return (
    <div className="space-y-3">
      {members.map((member) => {
        const isSelected = selectedMembers.includes(member.email);

        return (
          <div
            key={member.email}
            onClick={() => toggleMember(member.email)}
            className={`
              flex items-center justify-between p-4
              border cursor-pointer transition
              ${
                isSelected
                  ? "bg-prakida-flame/10 border-prakida-flame"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }
            `}
          >
            {/* LEFT: MEMBER INFO */}
            <div>
              <p className="text-white font-medium">{member.name}</p>
              <p className="text-sm text-gray-400">{member.email}</p>
            </div>

            {/* RIGHT: CHECKBOX */}
            <div
              className={`
                w-6 h-6 flex items-center justify-center
                border transition
                ${
                  isSelected
                    ? "bg-prakida-flame border-prakida-flame"
                    : "border-white/30"
                }
              `}
            >
              {isSelected && <Check size={16} className="text-white" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
