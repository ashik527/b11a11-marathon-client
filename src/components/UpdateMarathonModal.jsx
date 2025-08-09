// src/components/UpdateMarathonModal.jsx
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateMarathonModal = ({ marathon, onClose, refetch }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: marathon.title,
      location: marathon.location,
      distance: marathon.distance,
      description: marathon.description,
      image: marathon.image,
    }
  });

  const onSubmit = async (data) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/marathons/${marathon._id}`, data);
      toast.success('Marathon updated');
      onClose();
      refetch();
    } catch (err) {
      toast.error(`Update failed: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg relative">
        <button className="absolute top-2 right-2 text-xl font-bold" onClick={onClose}>✕</button>
        <h2 className="text-xl font-semibold mb-4">Update Marathon</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('title')} className="input input-bordered w-full" placeholder="Title" />
          <input {...register('location')} className="input input-bordered w-full" placeholder="Location" />
          <input {...register('distance')} className="input input-bordered w-full" placeholder="Distance" />
          <input {...register('image')} className="input input-bordered w-full" placeholder="Image URL" />
          <textarea {...register('description')} className="textarea textarea-bordered w-full" placeholder="Description" />

          <div className="text-right">
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMarathonModal;
