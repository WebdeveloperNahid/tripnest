"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { deleteTour, getMyTours, updateTour } from "@/lib/api/modify-tours";
import { DeleteResult, TTour, UpdateResult } from "@/types/tours";
import { useSession } from "@/lib/auth-client";

export default function ManageToursPage() {
  const { data: session, isPending } = useSession();
  const [tours, setTours] = useState<TTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTour, setEditingTour] = useState<TTour | null>(null);
  const [deletingTour, setDeletingTour] = useState<TTour | null>(null);

  const userId = session?.user?.id;

  useEffect(() => {
    let ignore = false;

    const fetchTours = async () => {
      if (isPending) return;

      if (!userId) {
        if (!ignore) setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await getMyTours(userId);
        if (!ignore) {
          setTours(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch tours:", error);
        if (!ignore) {
          toast.error("Failed to load your tours");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchTours();

    return () => {
      ignore = true;
    };
  }, [userId, isPending]);

  const handleDeleteConfirmed = async () => {
    if (!deletingTour || !userId) return;

    const result: DeleteResult = await deleteTour(deletingTour._id, userId);

    if (result?.deletedCount) {
      setTours((prev) => prev.filter((t) => t._id !== deletingTour._id));
      toast.success("Tour deleted successfully");
    } else {
      toast.error("Could not delete. Are you the owner of this tour?");
    }

    setDeletingTour(null);
  };

  const handleUpdate = async (data: Partial<TTour>) => {
    if (!editingTour || !userId) return;

    const result: UpdateResult = await updateTour(editingTour._id, {
      ...data,
      userId,
    });

    if (result?.modifiedCount !== undefined) {
      setTours((prev) =>
        prev.map((t) => (t._id === editingTour._id ? { ...t, ...data } : t)),
      );
      toast.success("Tour updated successfully");
      setEditingTour(null);
    } else {
      toast.error("Could not update. Are you the owner of this tour?");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-[#01504bea]">
      <h1 className="text-2xl font-bold  mb-4">Manage Your Tours</h1>

      {tours.length === 0 && <p>You have not posted any tours yet.</p>}

      <div className="grid gap-4">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="border bg-white rounded-lg p-4 flex justify-between items-center gap-4"
          >
            <div className="flex items-center gap-4">
              {tour.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div>
                <h2 className="font-semibold">{tour.title}</h2>
                <p className="text-sm text-gray-500">
                  {tour.destination} — ${tour.price}
                </p>
                <p className="text-xs text-gray-400">{tour.category}</p>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setEditingTour(tour)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => setDeletingTour(tour)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingTour && (
        <EditTourModal
          tour={editingTour}
          onClose={() => setEditingTour(null)}
          onSave={handleUpdate}
        />
      )}

      {deletingTour && (
        <ConfirmDeleteModal
          tourTitle={deletingTour.title}
          onCancel={() => setDeletingTour(null)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </div>
  );
}

function EditTourModal({
  tour,
  onClose,
  onSave,
}: {
  tour: TTour;
  onClose: () => void;
  onSave: (data: Partial<TTour>) => void;
}) {
  const [form, setForm] = useState({
    title: tour.title || "",
    category: tour.category || "",
    destination: tour.destination || "",
    price: tour.price || 0,
    startDate: tour.startDate || "",
    duration: tour.duration || "",
    groupSize: tour.groupSize || "",
    image: tour.image || "",
    shortDescription: tour.shortDescription || "",
    description: tour.description || "",
  });

  const [gallery, setGallery] = useState<string[]>(tour.gallery?.length ? tour.gallery : [""]);
  const [included, setIncluded] = useState<string[]>(tour.included?.length ? tour.included : [""]);
  const [excluded, setExcluded] = useState<string[]>(tour.excluded?.length ? tour.excluded : [""]);
  const [saving, setSaving] = useState(false);

  const handleChange = (field: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string,
  ) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const addListItem = (
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setList((prev) => [...prev, ""]);
  };

  const removeListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave({
      ...form,
      price: Number(form.price),
      gallery: gallery.filter((g) => g.trim() !== ""),
      included: included.filter((i) => i.trim() !== ""),
      excluded: excluded.filter((ex) => ex.trim() !== ""),
    });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Edit Tour</h2>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Tour Title</label>
            <input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="border w-full p-2 rounded mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Category</label>
              <input
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="border w-full p-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Destination</label>
              <input
                value={form.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                className="border w-full p-2 rounded mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium">Price (USD)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
                className="border w-full p-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="border w-full p-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Duration</label>
              <input
                value={form.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                className="border w-full p-2 rounded mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Group Size</label>
            <input
              value={form.groupSize}
              onChange={(e) => handleChange("groupSize", e.target.value)}
              className="border w-full p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Main Image URL</label>
            <input
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className="border w-full p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Gallery Images</label>
            {gallery.map((g, i) => (
              <div key={i} className="flex gap-2 mt-1">
                <input
                  value={g}
                  onChange={(e) => updateListItem(gallery, setGallery, i, e.target.value)}
                  className="border w-full p-2 rounded"
                  placeholder="https://example.com/gallery-image.jpg"
                />
                <button
                  type="button"
                  onClick={() => removeListItem(gallery, setGallery, i)}
                  className="px-2 text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addListItem(setGallery)}
              className="text-sm text-blue-500 mt-1"
            >
              + Add another image
            </button>
          </div>

          <div>
            <label className="text-sm font-medium">Short Description</label>
            <textarea
              value={form.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
              className="border w-full p-2 rounded mt-1"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Full Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="border w-full p-2 rounded mt-1"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Whats Included</label>
              {included.map((item, i) => (
                <div key={i} className="flex gap-2 mt-1">
                  <input
                    value={item}
                    onChange={(e) => updateListItem(included, setIncluded, i, e.target.value)}
                    className="border w-full p-2 rounded"
                    placeholder="e.g. Hotel accommodation"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem(included, setIncluded, i)}
                    className="px-2 text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem(setIncluded)}
                className="text-sm text-blue-500 mt-1"
              >
                + Add item
              </button>
            </div>

            <div>
              <label className="text-sm font-medium">Whats Excluded</label>
              {excluded.map((item, i) => (
                <div key={i} className="flex gap-2 mt-1">
                  <input
                    value={item}
                    onChange={(e) => updateListItem(excluded, setExcluded, i, e.target.value)}
                    className="border w-full p-2 rounded"
                    placeholder="e.g. Airfare"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem(excluded, setExcluded, i)}
                    className="px-2 text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem(setExcluded)}
                className="text-sm text-blue-500 mt-1"
              >
                + Add item
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6 sticky bottom-0 bg-white pt-3 border-t">
          <button onClick={onClose} disabled={saving} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-teal-600 text-white rounded disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmDeleteModal({
  tourTitle,
  onCancel,
  onConfirm,
}: {
  tourTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirmClick = async () => {
    setDeleting(true);
    await onConfirm();
    setDeleting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-2">Delete this tour?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{tourTitle}</span>? This action cannot
          be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmClick}
            disabled={deleting}
            className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Yes, delete it"}
          </button>
        </div>
      </div>
    </div>
  );
}