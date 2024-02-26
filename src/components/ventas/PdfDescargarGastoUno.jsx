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

export const PdfDescargarGastoUno = ({ gasto }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.tecnohouse_intro}>
          <Text style={styles.title}>TECNOHOUSE ABERTURAS</Text>
          <Text style={styles.title_two}>RESUMEN DE LAS VENTAS</Text>
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
              FECHA DE LA VENTA
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "semibold",
                fontSize: "10px",
                color: "#4F46E5",
              }}
            >
              {new Date(gasto?.created_at).toLocaleDateString("arg")}
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
              TOTAL VENTA
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "semibold",
                fontSize: "10px",
                color: "#4F46E5",
              }}
            >
              {gasto?.total?.toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
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
                color: "#4F46E5",
              }}
            >
              VENTA UNICA
            </Text>
          </View>
          <View
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
                  fontSize: "8px",
                  color: "black",
                }}
              >
                NUMERO:
              </Text>{" "}
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "semibold",
                  fontSize: "8px",
                  color: "#4F46E5",
                }}
              >
                {gasto?.id}
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
                  fontSize: "8px",
                  color: "black",
                }}
              >
                DETALLE:
              </Text>{" "}
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "semibold",
                  fontSize: "8px",
                  color: "#4F46E5",
                  textTransform: "uppercase",
                }}
              >
                {gasto?.detalle}
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
                  fontSize: "8px",
                  color: "black",
                }}
              >
                TIPO:
              </Text>{" "}
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "semibold",
                  fontSize: "8px",
                  color: "#4F46E5",
                  textTransform: "uppercase",
                }}
              >
                {gasto?.tipo}
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
                  fontSize: "8px",
                  color: "black",
                }}
              >
                N° FACTURA - REMITO - ETC:
              </Text>{" "}
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "semibold",
                  fontSize: "8px",
                  color: "#4F46E5",
                  textTransform: "uppercase",
                }}
              >
                N° {gasto?.numero}
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
                  fontSize: "8px",
                  color: "black",
                }}
              >
                TOTAL:
              </Text>{" "}
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "semibold",
                  fontSize: "8px",
                  color: "#4F46E5",
                  textTransform: "uppercase",
                }}
              >
                {gasto?.total?.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>
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
