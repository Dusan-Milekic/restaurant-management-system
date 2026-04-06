import { useEffect, useState } from "react"
import axios from "axios"
import { Stage, Layer, Rect, Circle, Text, Group } from "react-konva"
import Navbar from "../components/Navbar"
import Payment from "../components/Payment"
import useImage from "use-image"

type Table = {
  id: number
  broj: number
  kapacitet: number
  x: number
  y: number
  shape: string,
}

const BASE_WIDTH = 1440
const BASE_HEIGHT = 900

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return size
}

function BackgroundImage({ width, height }: { width: number; height: number }) {
  const [image] = useImage("https://www.transparenttextures.com/patterns/wood-pattern.png")
  return (
    <>
      <Rect x={0} y={0} width={width} height={height} fill="#3b2a1a" />
      <Rect x={0} y={0} width={width} height={height} fillPatternImage={image} fillPatternRepeat="repeat" opacity={0.2} />
    </>
  )
}

function TableGroup({ table, onDragEnd, onClick }: {
  table: Table
  onDragEnd: (id: number, x: number, y: number) => void
  onClick: (table: { id: number, broj: number }) => void
}) {
  const isRound = table.shape === "round"
  const isRect = table.shape === "rect"
  const width = isRect ? 140 : 100
  const height = isRect ? 80 : 100
    const hasOrder = JSON.parse(localStorage.getItem(`order_table_${table.broj}`) ?? "[]").length > 0
  return (
    <Group
      x={table.x}
      y={table.y}
      draggable
      onClick={() => onClick({ id: table.id, broj: table.broj })}
      onDragEnd={(e) => onDragEnd(table.id, e.target.x(), e.target.y())}
    >
      {isRound ? (
        <>
         <Circle x={35} y={35} radius={35} fill={hasOrder ? "#fde68a" : "#fef3c7"} stroke={hasOrder ? "#d97706" : "#b45309"} strokeWidth={1.5} />
         <Circle x={35} y={35} radius={35} fill={hasOrder ? "#fde68a" : "#fef3c7"} stroke={hasOrder ? "#d97706" : "#b45309"} strokeWidth={1.5} />
        </>
      ) : (
        <>
          <Rect width={width + 4} height={height + 4} x={-2} y={-2} fill={hasOrder ? "#d97706" : "#92400e"} opacity={0.3} cornerRadius={10} />
            <Rect width={width} height={height} fill={hasOrder ? "#fde68a" : "#fef3c7"} stroke={hasOrder ? "#d97706" : "#b45309"} strokeWidth={1.5} cornerRadius={8} />
        </>
      )}
      <Text
        text={`${table.broj}`}
        width={isRound ? 70 : width}
        y={isRound ? 22 : height / 2 - 12}
        align="center"
        fontSize={14}
        fontStyle="bold"
        fill="#78350f"
      />
      <Text
        text={`${table.kapacitet} mesta`}
        width={isRound ? 70 : width}
        y={isRound ? 38 : height / 2 + 4}
        align="center"
        fontSize={10}
        fill="#92400e"
      />
    </Group>
  )
}

export default function TablePage() {
  const { width, height } = useWindowSize()
  const stageHeight = height - 64
  const scaleX = width / BASE_WIDTH
  const scaleY = stageHeight / BASE_HEIGHT

  const [user, setUser] = useState<{ username: string; name: string; lastName: string } | null>(null)
  const [tables, setTables] = useState<Table[]>([])
  const [selectedTable, setSelectedTable] = useState<{ id: number, broj: number } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/login"
      return
    }

    axios.post("http://localhost:3000/api/user", { token })
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token")
        window.location.href = "/login"
      })

    axios.get("http://localhost:3000/api/tables")
      .then(res => setTables(res.data.tables))
      .catch(() => console.error("Greška pri učitavanju stolova"))
  }, [])

  const handleDragEnd = (id: number, x: number, y: number) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, x, y } : t))
  }

  const saveLayout = async () => {
    await axios.put("http://localhost:3000/api/tables/layout", { tables })
    alert("Raspored sačuvan!")
  }

  return (
    <>
      <Navbar username={user?.username} name={user?.name} lastname={user?.lastName} />
      <button
        onClick={saveLayout}
        className="absolute top-20 right-6 z-10 bg-amber-700 hover:bg-amber-800 text-white text-xs tracking-widest uppercase px-6 py-3 rounded-xl transition-colors duration-200"
      >
        Sačuvaj raspored
      </button>
      <Stage width={width} height={stageHeight}>
        <Layer>
          <BackgroundImage width={width} height={stageHeight} />
        </Layer>
        <Layer scaleX={scaleX} scaleY={scaleY}>
          {tables.map(table => (
            <TableGroup
              key={table.id}
              table={table}
              onDragEnd={handleDragEnd}
              onClick={(t) => setSelectedTable(t)}
              
            />
          ))}
        </Layer>
      </Stage>
      {selectedTable && (
        <Payment
          tableId={selectedTable.id}
          tableNumber={selectedTable.broj}
          onClose={() => setSelectedTable(null)}
        />
      )}
    </>
  )
}