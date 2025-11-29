"use client";
import React, { useState } from "react";
import { Button } from "./button";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

type AddNoteButtonProps = {
  className?: string;
};

const AddNoteButton = ({ className }: AddNoteButtonProps) => {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddNote = async () => {
    setIsLoading(true);
    const payload = { title: "Untitled" };
    try {
      const token = await getToken();
      const response = await axios.post(
        "http://localhost:4000/api/v1/create-note",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const neuroId = response.data?.neuroId;
      router.push(`/notes/${neuroId}`);
    } catch (error) {
      console.log(error);
      console.log("Something went wrong while creating new neuro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        aria-label="Add new note"
        disabled={isLoading}
        onClick={handleAddNote}
        className={`rounded-xl  ${className}`}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5" />
        ) : (
          <Plus className="w-16 h-16" />
        )}
      </Button>
    </>
  );
};

export default AddNoteButton;
