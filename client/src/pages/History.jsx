import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { marked } from "marked";

const History = () => {
  const { user, isSignedIn } = useUser();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!isSignedIn) return;

      try {
        const res = await axios.get(`https://resume-backend-f3uo.onrender.com/history/${user.id}`);
        setHistory(res.data);
      } catch (error) {
        console.error("❌ Error fetching history:", error);
        alert("Failed to load resume history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, isSignedIn]);

  console.log("Fetching history for userId:", user?.id);


  if (!isSignedIn) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        Please log in to view your resume history.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📜 Your Resume Analysis History</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading history...</p>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-500">No resume analyses found.</p>
      ) : (
        <div className="space-y-6">
          {history.map((item, index) => (
            <div key={item._id} className="p-5 bg-white shadow-md rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">🗓️ {new Date(item.createdAt).toLocaleString()}</p>
              <p className="font-medium text-gray-800">Rating: {item.rating}</p>
              <p className="text-gray-600">Suggestions: {item.suggestions.length}</p>
              <div className="mt-2 text-sm text-gray-700 max-h-32 overflow-y-auto prose prose-sm" dangerouslySetInnerHTML={{ __html: marked(item.feedback.slice(0, 300) + "...") }}></div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-600 hover:underline text-sm">&larr; Back to Upload</Link>
      </div>
    </div>
  );
};

export default History;
