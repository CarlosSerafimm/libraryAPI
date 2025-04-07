import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { AnimatePresence, motion } from "framer-motion";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-gradient-to-br from-blue-700 to-blue-500 w-screen min-h-screen flex justify-center items-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          layout
          className="w-full max-w-md"
        >
          {isLogin ? (
            <Login toggle={() => setIsLogin(false)} />
          ) : (
            <Register toggle={() => setIsLogin(true)} />
          )}  
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Auth;
