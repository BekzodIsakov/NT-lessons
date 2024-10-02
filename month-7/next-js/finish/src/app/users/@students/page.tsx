import Link from "next/link";
import React from "react";

interface User {
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  __v: number;
}

export default async function page() {
  const response = await fetch("https://fakestoreapi.com/users");
  const students: User[] = await response.json();
  return (
    <div className="page">
      <h3>Students page</h3>
      <ol>
        {students.map((student: User) => (
          <li key={student.id}>
            <Link href={`/users/students/${student.id}`}>
              {student.name.firstname}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
