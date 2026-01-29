import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { Users, BedDouble } from "lucide-react";
import MemberSelector from "../components/MemberSelector";

const PRICE_PER_PERSON = 920;

const AccommodationRegistration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Fetch confirmed members
  useEffect(() => {
    if (!user) return;

    const fetchRegistrations = async () => {
      try {
        const ref = doc(db, "events_registrations", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setMembers([]);
          return;
        }

        const data = snap.data();
        console.log(data);
        const confirmedMembers = Object.values(data?.events ?? {})
          .filter((e) => e.status === "confirmed")
          .flatMap((e) => e.members ?? []);

        setMembers(confirmedMembers);
      } catch (err) {
        console.error(err);
        setError("Failed to load registered members.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [user]);

  // Price calculation
  const totalAmount = useMemo(
    () => selectedMembers.length * PRICE_PER_PERSON,
    [selectedMembers.length],
  );

  // Placeholder payment handler
  const handlePayment = async () => {
    const payload = {
      type: "accommodation",
      members: selectedMembers,
      amount: totalAmount,
    };

    console.log("PAYMENT PAYLOAD:", payload);

    // TODO: connect backend payment API
    // await fetch("/api/accommodation/pay", {...})
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        Loading accommodation data...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <BedDouble className="text-prakida-flame" />
            Accommodation Booking
          </h1>
          <p className="text-gray-400 mt-2">
            Select confirmed participants for accommodation.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-red-500/50 bg-red-900/20 text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MEMBER LIST */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="text-prakida-flame" />
              Eligible Members
            </h2>

            {members.length === 0 && (
              <div className="text-gray-400">
                No confirmed participants found.
              </div>
            )}

            <MemberSelector
              members={members}
              selectedMembers={selectedMembers}
              setSelectedMembers={setSelectedMembers}
            />
          </div>

          {/* CART */}
          <div className="bg-white/5 border border-white/10 p-6 h-fit">
            <h3 className="text-xl font-bold text-white mb-4">
              Accommodation Cart
            </h3>

            <div className="space-y-2 text-gray-400 text-sm">
              <p>
                Selected Members:{" "}
                <span className="text-white font-bold">
                  {selectedMembers.length}
                </span>
              </p>
              <p>Price per person: ₹{PRICE_PER_PERSON}</p>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-lg text-white font-bold">
                Total: ₹{totalAmount}
              </p>
            </div>

            <button
              disabled={!selectedMembers.length}
              onClick={handlePayment}
              className="mt-6 w-full bg-prakida-flame text-white py-3 font-bold tracking-wider disabled:opacity-50"
            >
              PAY NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationRegistration;
