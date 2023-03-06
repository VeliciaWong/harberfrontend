import { Modal, Text } from "@nextui-org/react";
import Button from "../button/Button";
import Field from "../forms/Field";
import Input from "../inputs/Input";
import { useForm } from "react-hook-form";

export default function ModalRecovery({ open, onClose, onSubmit, loading }){
  const { register, handleSubmit } = useForm();

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeButton
      aria-labelledby="modal-recovery"
    >
      <Modal.Header>
        <Text size={23} className="text-black font-semibold">Silakan masukan akun email Anda !</Text>
      </Modal.Header>
      <Modal.Body>
        {/* pertanyaannya nanti bisa ditarik dari berdasarkan yg user pilih pas dia register akun */}

        <Text size={17} className="font-bold">Email</Text>    
        <Input {...register("email", { required: true })} />

      </Modal.Body>
      <Modal.Footer justify="center">
        <Button
            // loading={loading}
            variant="submit"
            onClick={handleSubmit(onSubmit)}
        >
          KONFIRMASI
        </Button>
      </Modal.Footer>
    </Modal>
  );
};