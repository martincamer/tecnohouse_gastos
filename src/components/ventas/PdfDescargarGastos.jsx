import {
  Document,
  Text,
  View,
  Font,
  Image,
  StyleSheet,
  Page,
} from "@react-pdf/renderer";

import montserratBold from "../../fonts/Montserrat-Bold.ttf";
import montserratSemiBold from "../../fonts/Montserrat-SemiBold.ttf";
import montserratRegular from "../../fonts/Montserrat-Regular.ttf";

export const PdfDescargarGastos = ({ results }) => {
  const total = results.reduce(
    (acumulador, gasto) => acumulador + gasto.total,
    0
  );

  const fechaActual = new Date();
  console.log(fechaActual);

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.tecnohouse_intro}>
          <Text style={styles.title}>TECNOHOUSE ABERTURAS</Text>
          <Text style={styles.title_two}>RESUMEN DEL GASTO</Text>
        </View>
        <View style={styles.tecnohouse_intro}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "semibold",
                fontSize: "10px",
              }}
            >
              FECHA:
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "semibold",
                fontSize: "10px",
                color: "#00AEAE",
                textTransform: "uppercase",
              }}
            >
              {fechaActual?.toLocaleString("es-AR", { month: "long" })},{" "}
              {fechaActual?.toLocaleString("es-AR", { year: "numeric" })}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "semibold",
                fontSize: "10px",
              }}
            >
              TOTAL VENTAS
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "semibold",
                fontSize: "10px",
                color: "#00AEAE",
              }}
            >
              {total?.toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}{" "}
            </Text>
          </View>
        </View>
        {/* //LOS GASTOS VIEW */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            borderRadius: "2px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "gray",
            padding: "20px 20px",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "semibold",
                fontSize: "14px",
                color: "#00AEAE",
              }}
            >
              TODAS LAS VENTAS
            </Text>
          </View>
          {results.map((g) => (
            <View
              key={g.id}
              style={{
                borderRadius: "2px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "gray",
                padding: "15px 15px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
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
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    fontSize: "10px",
                    color: "black",
                  }}
                >
                  NUMERO:
                </Text>{" "}
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    fontSize: "10px",
                    color: "#00AEAE",
                  }}
                >
                  {g.id}
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
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    fontSize: "10px",
                    color: "black",
                  }}
                >
                  DETALLE:
                </Text>{" "}
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    fontSize: "10px",
                    color: "#00AEAE",
                    textTransform: "uppercase",
                  }}
                >
                  {g.detalle}
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
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    fontSize: "10px",
                    color: "black",
                  }}
                >
                  TIPO:
                </Text>{" "}
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    fontSize: "10px",
                    color: "#00AEAE",
                    textTransform: "uppercase",
                  }}
                >
                  {g.tipo}
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
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    fontSize: "10px",
                    color: "black",
                  }}
                >
                  N° FACTURA - REMITO - ETC:
                </Text>{" "}
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "semibold",
                    fontSize: "10px",
                    color: "#00AEAE",
                    textTransform: "uppercase",
                  }}
                >
                  N° {g.numero}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: montserratRegular,
    },
    {
      src: montserratSemiBold,
      fontWeight: "semibold",
    },
    {
      src: montserratBold,
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    fontFamily: "Montserrat",
    fontWeight: "semibold",
    fontSize: "12px",
  },
  title_two: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: "12px",
  },
  tecnohouse_intro: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "2px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "gray",
    padding: "20px 20px",
  },
});

// ReactPDF.render(<Quixote />);
