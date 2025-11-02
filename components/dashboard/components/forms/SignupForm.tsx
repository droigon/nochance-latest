//"use client";
//
//import { useState, TransitionStartFunction } from "react";
//import { SignupDTO } from "@/dtos/auth.dto";
//import { signupUser, signupVendor } from "@/services/auth/auth";
//import { Input } from "@/components/ui/Input";
//import { Button } from "@/components/ui/Button";
//import { useRouter } from "next/navigation";
//
//interface Props {
//  role: "user" | "vendor";
//}
//
//export default function SignupForm({ role }: Props) {
//  const [form, setForm] = useState<SignupDTO>({
//    email: "",
//    password: "",
//    fullName: "",
//  });
//  const [loading, setLoading] = useState(false);
//  const router = useRouter();
//
//  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//    setForm({ ...form, [e.target.name]: e.target.value });
//  };
//
//  const handleSubmit = async () => {
//    setLoading(true);
//    try {
//      if (role === "user") {
//        await signupUser(form);
//      } else {
//        await signupVendor(form);
//      }
//      alert("Signup successful!");
//      router.push("/dashboard");
//    } catch (err) {
//      console.error(err);
//      alert("Signup failed");
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  return (
//    <div className="p-6 bg-white rounded-2xl shadow-md space-y-4 w-full max-w-md">
//      <h2 className="text-xl font-semibold text-center capitalize">
//        {role} Signup
//      </h2>
//      <Input
//        name="fullName"
//        placeholder="Full Name"
//        value={form.fullName}
//        onChange={handleChange}
//      />
//      <Input
//        name="email"
//        placeholder="Email"
//        value={form.email}
//        onChange={handleChange}
//      />
//      <Input
//        name="password"
//        type="password"
//        placeholder="Password"
//        value={form.password}
//        onChange={handleChange}
//      />
//      <Button disabled={loading} onClick={handleSubmit}>
//        {loading ? "Signing up..." : "Signup"}
//      </Button>
//    </div>
//  );
//}
