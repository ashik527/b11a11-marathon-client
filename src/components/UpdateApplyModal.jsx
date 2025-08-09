// src/components/UpdateApplyModal.jsx
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateApplyModal = ({ apply, onClose, refetch }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      contact: apply.contact,
      firstName: apply.firstName,
      lastName: apply.lastName,
      info: apply.info
    }
  });

  const onSubmit = async (data) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/registrations/${apply._id}`, data);
      toast.success('Updated successfully');
      refetch();
      onClose();
    } catch (err) {
      toast.error(`Update failed: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl relative shadow-md">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>✕</button>
        <h3 className="text-xl font-bold mb-4">Update Registration</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input value={apply.marathonTitle} disabled className="input input-bordered w-full" />
          <input value={apply.marathonStartDate} disabled className="input input-bordered w-full" />
          <input {...register('firstName')} className="input input-bordered w-full" />
          <input {...register('lastName')} className="input input-bordered w-full" />
          <input {...register('contact')} className="input input-bordered w-full" />
          <textarea {...register('info')} className="textarea textarea-bordered w-full" rows={3}></textarea>
          <div className="text-right">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateApplyModal;
