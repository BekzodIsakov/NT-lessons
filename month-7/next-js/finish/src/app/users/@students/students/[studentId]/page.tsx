import ProfileCard from "@/components/ProfileCard";
import React from "react";

export default async function page({
  params,
}: {
  params: { studentId: string };
}) {
  const { studentId } = params;

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(`https://fakestoreapi.com/users/${studentId}`);
  const student = await response.json();
  console.log(student);

  return (
    <div className='page'>
      <h3>Student page</h3>
      {student ? (
        <ProfileCard name={student.name.firstname} />
      ) : (
        "Student not found!"
      )}
    </div>
  );
}
