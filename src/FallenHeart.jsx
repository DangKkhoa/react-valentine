import { useState, useEffect } from 'react'

import { motion } from 'motion/react'

const FallenHeart = () => {

  const [hearts, setHearts] = useState([]);

  useEffect(() => {

    const newHearts = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Random position
      duration: 3 + Math.random() * 2, // Random fall duration
      size: 20 + Math.random() * 30, // Random heart size
    }));
    console.log(newHearts);
    setHearts(newHearts);

  }, []);
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "-10%", opacity: 0 }}
          animate={{ y: "100vh", opacity: 1 }}
          transition={{ duration: heart.duration, ease: "linear" }}
          className="absolute text-red-500"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}

export default FallenHeart