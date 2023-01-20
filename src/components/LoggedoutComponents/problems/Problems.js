import { Link } from "react-router-dom";

export function Problems() {
  var window_innerWidth = window.innerWidth;
  var height =
    window_innerWidth <= 767
      ? window.innerHeight * 0.46
      : window.innerHeight * 0.92;

  var col_styles = { minHeight: height };

  var problemClassStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "90%",
    padding: "2% 5%",
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    backgroundColor: "#f2e9f9",
    border: "None",
  };
  
  
  return (
    <div style={{ backgroundColor: "#f2e9f9" }}>
      <div className="container">
        <div className="row" style={{ paddingTop: "2%" }}>
          <div className="col-md-6 col-12" style={col_styles}>
            <Link to="/problems/easy" style={{ textDecoration: "none" }}>
              <div className="problemCLass" style={problemClassStyles}>
                <p className="display-2">FEELING BORED</p>
                <h1 className="display-2">TRY THESE EASY...</h1>
              </div>
            </Link>
          </div>
          <div className="col-md-6 col-12" style={col_styles}>
            <Link to="/problems/medium" style={{ textDecoration: "none" }}>
              <div className="problemCLass" style={problemClassStyles}>
                <h1 className="display-2">FEELING MOTIVATED</h1>
                <h1 className="display-2">TRY THESE MEDIUM...</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


