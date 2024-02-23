import {
  Document,
  Text,
  View,
  Font,
  StyleSheet,
  Page,
} from "@react-pdf/renderer";

import montserratBold from "../../fonts/Montserrat-Bold.ttf";
import montserratSemiBold from "../../fonts/Montserrat-SemiBold.ttf";
import montserratRegular from "../../fonts/Montserrat-Regular.ttf";

export const DownloadPDFButton = ({ aberturasConPreciosFinales }) => {
  const fechaActual = new Date();

  // Agrupar aberturas por tipo (ventana o puerta)
  const aberturasPorTipo = aberturasConPreciosFinales.reduce(
    (acc, abertura) => {
      const tipo = abertura.tipo; // Asegúrate de tener el campo 'tipo' en tus datos
      if (!acc[tipo]) {
        acc[tipo] = [];
      }
      acc[tipo].push(abertura);
      return acc;
    },
    {}
  );

  return (
    <Document>
      {Object.entries(aberturasPorTipo).map(([tipo, aberturas], pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.body}>
          <View style={styles.tecnohouse_intro}>
            <Text style={styles.titleTwo}>TECNOHOUSE ABERTURAS</Text>
            <Text style={styles.title_two}>INVENTARIO</Text>
          </View>
          <View style={styles.tecnohouse_intro}>
            {/* ... Resto del contenido ... */}
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                fontSize: "10px",
                textTransform: "uppercase",
              }}
            >
              Fecha Actual
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "normal",
                fontSize: "10px",
                textTransform: "uppercase",
                textDecoration: "underline",
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
                  marginBottom: "10px",
                }}
              >
                {tipo.toUpperCase()}S
              </Text>
              {aberturas.map((abertura, index) => (
                <View style={styles.table} key={index}>
                  <View style={styles.row}>
                    <Text style={styles.cell}>{abertura.detalle}</Text>
                    <Text
                      style={styles.cell}
                    >{`Color: ${abertura.color} / Categoria: ${abertura.categoria} / ${abertura.ancho}x${abertura.alto}`}</Text>
                  </View>
                  <View style={styles.rowTwo}>
                    <Text
                      style={styles.cell}
                    >{`Precio final: ${abertura.totalConAumento.toLocaleString(
                      "es-ar",
                      {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      }
                    )}`}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Page>
      ))}
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
  titleTwo: {
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
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Montserrat",
    fontWeight: "semibold",
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    alignItems: "center",
    height: 30,
    fontSize: 12,
  },
  rowTwo: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    // borderBottomColor: "#000",
    alignItems: "center",
    height: 30,
    fontSize: 12,
  },
  cell: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    display: "flex",
    padding: 5,
    textTransform: "uppercase",
    fontSize: "8px",
    fontFamily: "Montserrat",
    fontWeight: "semibold",
  },
});

// ReactPDF.render(<Quixote />);
