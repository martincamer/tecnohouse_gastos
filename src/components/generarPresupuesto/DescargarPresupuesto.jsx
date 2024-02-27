import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import poppinsBold from "../../fonts/Montserrat-Light.ttf";
import poppinsSemiBold from "../../fonts/Montserrat-SemiBold.ttf";
import poppinsRegular from "../../fonts/Montserrat-Bold.ttf";

import logo from "../../../public/logo.png";

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: poppinsRegular,
    },
    {
      src: poppinsSemiBold,
      fontWeight: "semibold",
    },
    {
      src: poppinsBold,
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  table: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "95%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    // borderTop: "0.5px solid #000",
    borderBottom: "0.3px solid #000",
    width: "92%",
    textTransform: "uppercase",
  },
  rowTwo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderBottom: "0.3px solid #000",
    width: "92%",
  },
  content_row: {
    // borderTop: "0.6px solid #000",
    borderBottom: "0.6px solid #000",
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingHorizontal: "10px",
    width: "92%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "10px",
    // borderRadius: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  row1: {
    width: "100px",
    // borderRight: "0.5px solid #000",
    // borderLeft: "0.5px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    fontSize: "8px",
    fontFamily: "Montserrat",
    fontWeight: "semibold",
    color: "#000",
  },
  rowCant: {
    width: "20px",
    // borderRight: "0.5px solid #000",
    // borderLeft: "0.5px solid #000",
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    fontSize: "8px",
    fontFamily: "Montserrat",
    fontWeight: "semibold",
    color: "#000",
  },

  row3: {
    width: "100px",
    fontSize: "7px",
    fontFamily: "Montserrat",
    paddingTop: 8,
    // borderRight: "0.5px solid #000",
    // borderLeft: "0.5px solid #000",
    // backgroundColor: "gray",
    paddingBottom: 8,
    textAlign: "center",
    fontWeight: "normal",
    height: "100%",
    textTransform: "uppercase",
  },

  rowCantTree: {
    width: "20px",
    fontSize: "7px",
    fontFamily: "Montserrat",
    fontWeight: "normal",
    paddingTop: 8,
    // borderRight: "0.5px solid #000",
    // borderLeft: "0.5px solid #000",
    // backgroundColor: "gray",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
    textTransform: "uppercase",
  },
  row4: {
    width: "50%",
    fontSize: "8px",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    paddingTop: 8,
    // borderRight: "0.5px solid #000",
    // borderLeft: "0.5px solid #000",
    paddingBottom: 8,
    textAlign: "center",
    height: "100%",
  },
  contentFactura: {
    width: "84%",
    margin: "30px auto 10px auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    border: "0.8px solid black",
    borderRadius: "3px",
    padding: "0px 0px 20px 0px",
    position: "relative",
  },
  content_uno: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    padding: "10px",
  },
  contentFinal: {
    width: "80%",
    margin: "0 auto",
    paddingTop: "50px",
    paddingBottom: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "5px",
  },
  content: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
  content_page: {
    height: "100%",
    width: "100%",
    border: "1px solid black",
    borderRadius: "4px",
  },
  content_footer: {
    width: "86%",
    margin: "30px auto",
    // padding: "8px 10px",
    // borderTop: "0.6px solid #000",
    // borderBottom: "0.6px solid #000",
    width: "87%",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    // borderRadius: 2,
  },
});

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function dateTime(data) {
  return new Date(data).toLocaleDateString("arg", options);
}

export const DescargarPresupuesto = ({ datos }) => {
  return (
    <Document pageMode="fullScreen">
      <Page size={"A4"} style={styles.content}>
        <View>
          <View style={styles.contentFactura}>
            <View style={styles.content_uno}>
              <Image
                style={{
                  width: "80px",
                }}
                src={logo}
              />
              {/* <Text
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  fontFamily: "Montserrat",
                  textTransform: "capitalize",
                }}
              >
              </Text> */}
              {/* <View
                style={{
                  fontSize: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "3px",
                }}
              >
                <Text style={{ fontSize: "7px", fontFamily: "Montserrat" }}>
                  <Text
                    style={{
                      fontSize: "7px",
                      fontFamily: "Montserrat",
                      fontWeight: "semibold",
                    }}
                  >
                    Empresa:
                  </Text>{" "}
                  Tecnohouse
                </Text>
              </View>
              <View
                style={{
                  fontSize: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "3px",
                }}
              >
                <Text style={{ fontSize: "7px", fontFamily: "Montserrat" }}>
                  <Text
                    style={{
                      fontSize: "7px",
                      fontFamily: "Montserrat",
                      fontWeight: "semibold",
                    }}
                  >
                    Email:
                  </Text>{" "}
                </Text>
              </View> */}
            </View>
            <View
              style={{
                border: "0.6px solid black",
                width: "50px",
                padding: "6px 0px",
                position: "absolute",
                top: "0",
                backgroundColor: "#3b4252",
                color: "white",
              }}
            >
              <Text
                style={{
                  position: "relative",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "Montserrat",
                  textTransform: "uppercase",
                }}
              >
                {"P"}
              </Text>
              <Text
                style={{
                  height: "39px",
                  borderRight: "0.5px solid black",
                  position: "absolute",
                  top: "37px",
                  left: "23px",
                }}
              ></Text>
            </View>
            <View style={styles.content_uno}>
              <Text
                style={{
                  fontSize: "13px",
                  fontFamily: "Montserrat",
                  fontWeight: "semibold",
                  textTransform: "uppercase",
                  color: "#279ca4",
                }}
              >
                {/* N° 0000- {datos?.id} */}
              </Text>
              <Text
                style={{
                  fontSize: "10px",
                  fontWeight: "semibold",
                  fontFamily: "Montserrat",
                }}
              >
                Presupuesto orginal
              </Text>
              <View
                style={{
                  fontSize: "10px",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "8px",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "8px",
                      fontWeight: "semibold",
                    }}
                  >
                    Emisión:{" "}
                  </Text>
                  {new Date().toLocaleDateString("arg")}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.content_row}>
              <View
                style={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "3px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      fontWeight: "semibold",
                    }}
                  >
                    CLIENTE
                  </Text>{" "}
                  <Text
                    style={{
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      textTransform: "uppercase",
                      color: "rgb(55 65 81)",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "8px",
                        fontFamily: "Montserrat",
                        textTransform: "uppercase",
                        color: "#000",
                      }}
                    >
                      {datos?.cliente}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "3px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      fontWeight: "semibold",
                    }}
                  >
                    DOMICILIO
                  </Text>{" "}
                  <Text
                    style={{
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      textTransform: "uppercase",
                      color: "#000",
                    }}
                  >
                    {/* {unicoPresupuesto?.clientes?.domicilio}{" "} */}-
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "3px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      fontWeight: "semibold",
                      textTransform: "capitalize",
                    }}
                  >
                    LOCALIDAD
                  </Text>{" "}
                  <Text
                    style={{
                      fontSize: "8px",
                      textTransform: "uppercase",
                      fontFamily: "Montserrat",
                      color: "#000",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "8px",
                        fontFamily: "Montserrat",
                        textTransform: "uppercase",
                        color: "#000",
                      }}
                    >
                      {datos?.localidad}
                    </Text>
                  </Text>
                </View>
                {/* <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "3px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      fontWeight: "semibold",
                      textTransform: "capitalize",
                    }}
                  >
                    PROVINCIA
                  </Text>{" "}
                  <Text
                    style={{
                      fontSize: "8px",
                      textTransform: "capitalize",
                      fontFamily: "Montserrat",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "8px",
                        fontFamily: "Montserrat",
                        textTransform: "uppercase",
                        color: "#279ca4",
                      }}
                    >
                      {datos?.clientes?.provincia}
                    </Text>{" "}
                  </Text>
                </View> */}
              </View>
              <View
                style={{
                  display: "flex",
                  gap: "4px",
                }}
              >
                {/* <View>
                  <Text
                    style={{
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      fontWeight: "semibold",
                      textTransform: "capitalize",
                    }}
                  >
                    CONDICIÓN DE VENTA -
                  </Text>
                </View> */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "3",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      fontWeight: "semibold",
                      textTransform: "capitalize",
                    }}
                  >
                    FECHA DE VENCIMIENTO
                  </Text>
                  <Text
                    style={{
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      textTransform: "uppercase",
                      color: "#000",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "8px",
                        fontFamily: "Montserrat",
                        textTransform: "uppercase",
                        color: "#000",
                      }}
                    >
                      {dateTime(datos?.created_at)}
                    </Text>{" "}
                  </Text>
                </View>
                {/* <View>
                  <Text
                    style={{
                      fontSize: "8px",
                      fontFamily: "Montserrat",
                      fontWeight: "semibold",
                      textTransform: "capitalize",
                    }}
                  >
                    CONDICIÓN -
                  </Text>
                </View> */}
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowCant}>Cant.</Text>
              <Text style={styles.row1}>Detalle.</Text>
              <Text style={styles.row1}>Medida</Text>
              <Text style={styles.row1}>Color</Text>
              <Text style={styles.row1}> Precio x und</Text>
              <Text style={styles.row1}> Precio final</Text>
            </View>

            {datos?.datos?.resultado.map((p) => (
              <View key={p.nobmre} style={styles.rowTwo}>
                <Text style={styles.rowCantTree}>{p.cantidad}</Text>
                <Text style={styles.row3}>{p.detalle}</Text>
                <Text style={styles.row3}>
                  {p.ancho}x{p?.alto}
                </Text>
                <Text style={styles.row3}>{p.color}</Text>
                <Text style={styles.row3}>
                  {p?.precioUnidad?.toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}
                </Text>
                <Text style={styles.row3}>
                  {p?.precioFinal?.toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.content_footer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <Text
                style={{
                  fontSize: "8px",
                  fontFamily: "Montserrat",
                  fontWeight: "semibold",
                }}
              >
                TOTAL
              </Text>
              <Text
                style={{
                  fontSize: "8px",
                  fontFamily: "Montserrat",
                  fontWeight: "normal",
                  textTransform: "uppercase",
                  color: "#000",
                }}
              >
                {Number(datos?.total)?.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}{" "}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
