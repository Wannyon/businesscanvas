import './App.css'

import { useRecordStore } from "./store/useRecordStore.ts";

function App() {
    const { records, addRecord } = useRecordStore();

  return (
      <>
          <div>
              <h1>회원 목록</h1>
              <ul>
                  {records.map((record) => (
                      <li key={record.id}>{record.name} - {record.job}</li>
                  ))}
              </ul>
              <button
                  onClick={() =>
                      addRecord({
                          id: Date.now(),
                          name: "New Member",
                          address: "서울 마포구",
                          memo: "신규 가입",
                          joinedAt: new Date().toISOString().split("T")[0],
                          job: "디자이너",
                          emailConsent: false,
                      })
                  }
              >
                  회원 추가
              </button>
          </div>
      </>
  )
}

export default App
