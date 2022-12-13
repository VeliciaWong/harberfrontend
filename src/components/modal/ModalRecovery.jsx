import { Modal, Text } from "@nextui-org/react";
import Button from "../button/Button";
import Field from "../forms/Field";
import Input from "../inputs/Input";
import { useForm } from "react-hook-form";

export default function ModalRecovery({ open, onClose, data, onSubmit, loading }){
  const { register, handleSubmit } = useForm();

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeButton
      aria-labelledby="modal-recovery"
    >
      <Modal.Header>
        <Text size={23} className="text-black font-semibold">Please answer your recovery question to recover your password</Text>
      </Modal.Header>
      <Modal.Body>
        {/* pertanyaannya nanti bisa ditarik dari berdasarkan yg user pilih pas dia register akun */}
        <Text size={20} className="text-black italic text-center">Question ?</Text>

        <Text size={17} className="font-bold">Your Answer</Text>    
        <Input {...register("recovery_answer", { required: true })} />
        
       
      </Modal.Body>
      <Modal.Footer justify="center">
        <Button
            // loading={loading}
            variant="submit"
            onClick={handleSubmit(onSubmit)}
        >
          SUBMIT
        </Button>
      </Modal.Footer>
    </Modal>
  );
};