cd server || exit
npm start &
EXPRESS_PID=$!
echo "Express server started with PID $EXPRESS_PID"
cd ..

cd client || exit
npm run dev &
VITE_PID=$!
echo "Vite server started with PID $VITE_PID"
cd ..

function stop_all {
  echo "Stopping servers..."
  kill $EXPRESS_PID
  kill $VITE_PID
  echo "Servers stopped"
  exit 0
}

trap stop_all SIGINT

wait