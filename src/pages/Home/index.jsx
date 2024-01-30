import { useMemoryWallContext } from "../../contexts/MemoryWallContexts";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const Home = () => {
  const { memoryWalls } = useMemoryWallContext();
  //console.log(memoryWalls);

  const maxWords = 23;
  return (
    <>
      {memoryWalls.map((memoryWall, index) => (
        <Link
          to={`/memory-wall`}
          state={{ index: index }}
          key={index}
          style={{ textDecoration: "none" }}
        >
          <div
            className="card-style"
            style={{
              width: "15rem",
              display: "inline-block",
              margin: "1rem",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Card.Img
                variant="top"
                style={{
                  height: "15rem",
                  width: "15rem",
                  objectFit: "cover",
                }}
                src={memoryWall.sliderUpdates[0].imagePath}
              />
              <Card.Body>
                <Card.Title>{memoryWall.title}</Card.Title>
                <Card.Text
                  style={{
                    direction: "rtl",
                    textAlign: "right",
                    height: "100px",
                  }}
                >
                  {memoryWall.about.split(" ").slice(0, maxWords).join(" ")}...
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Home;
