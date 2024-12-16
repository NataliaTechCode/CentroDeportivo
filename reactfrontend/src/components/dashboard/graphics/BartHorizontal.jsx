import { ResponsiveBar } from "@nivo/bar";

const BartHorizontal = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={["Disponible", "No Disponible"]}
    indexBy="sport"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    layout="horizontal"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "dark2" }} // Solo colores, sin patrones
    borderColor="black"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "sport",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Deportes",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    enableLabel={false}
    enableTotals={true}
    totalsOffset={11}
    labelSkipWidth={16}
    labelSkipHeight={12}
    labelTextColor="black"
    labelPosition="end"
    legends={[
      {
        dataFrom: "keys",
        anchor: "top",
        direction: "row",
        justify: false,
        translateX: 15,
        translateY: -24,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={(e) =>
      e.id + ": " + e.formattedValue + " in sport: " + e.indexValue
    }
  />
);

export default BartHorizontal;
