import { Modal, Text } from "@nextui-org/react";
import Button from "../button/Button";
import Field from "../forms/Field";
import Input from "../inputs/Input";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ListBoxInput from "../inputs/ListBox";
import { Listbox, Transition, Fragment } from '@headlessui/react'
import { useMutation, useQuery } from "@tanstack/react-query";
const { ChevronDownIcon } = require("@heroicons/react/20/solid");
import { axiosHarber, axiosLocal } from "../../helpers/axios";


export default function ModalSetRecovery({ open, onClose, onSubmit, loading }){
  const recoveryQuestionListQuery = useQuery({
    queryKey: ["recoveryquestion-list"],
    queryFn: async () => {
      // let result = await axiosLocal.get(`/question_recovery`);
      let result = await axiosHarber.get(`/question_recovery`);
      return result.data;
    },
});

    // const recoveryQuestions = [
    //     { id: 1, name: 'A' },
    //     { id: 2, name: 'B' },
    //     { id: 3, name: 'C' },
    //   ]
  const { register, handleSubmit, control } = useForm();

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeButton
      aria-labelledby="modal-set-recovery"
    >
      <Modal.Header>
        <Text size={23} className="text-black font-semibold">Please choose your recovery question and answer to finish register your account !</Text>
      </Modal.Header>
      <Modal.Body>
        <Text size={17} className="font-semibold">Recovery Question</Text>    
        {/* <Controller control={control} name="recoveryQuestions" render={({
            field: { onChange, value },
                }) => (
                    <ListBoxInput value={value} onChange={onChange} options={selectedRecoveryQuestion} />
                )} /> */}
                <Controller
                  name="recoveryQuestion"
                  render={({ field }) => (
                    <ListBoxInput
                      {...field}
                      options={recoveryQuestionListQuery.data?.map((recquestion) => ({
                        id: recquestion.id,
                        name: recquestion.question,
                      }))}
                      />
                      )}
                      rules={{
                      required: true,
                      }}
                      control={control}
                  />
        {/* <Listbox value={selectedRecoveryQuestion} onChange={setSelectedRecoveryQuestion}>
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white text-black py-2 pl-5 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-base border">{selectedRecoveryQuestion.name} <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span></Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <Listbox.Options className="relative z-10 max-h-30 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {recoveryQuestions.map((question) => (
                <Listbox.Option
                    key={question.id}
                    className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                    }
                    value={question}
                >
                    {question.name}
                </Listbox.Option>
                ))}
            </Listbox.Options>
            </Transition>
        </Listbox> */}
        <Text size={17} className="font-semibold">Your Answer</Text>    
        <Input {...register("recovery_answer", { required: true })} />
        
       
      </Modal.Body>
      <Modal.Footer justify="center">
        <Button
            // loading={loading}
            variant="submit"
            onClick={handleSubmit(onSubmit)}
        >
          CONFIRM
        </Button>
      </Modal.Footer>
    </Modal>
  );
};