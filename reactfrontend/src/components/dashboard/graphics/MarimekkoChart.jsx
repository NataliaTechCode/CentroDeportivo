import { ResponsiveMarimekko } from "@nivo/marimekko";

const Marimekko = ({ data }) => (
  <ResponsiveMarimekko
    data={data}
    id="sport"
    value="Deportes"
    dimensions={[
      {
        id: "disagree strongly",
        value: "stronglyDisagree",
      },
      {
        id: "disagree",
        value: "disagree",
      },
      {
        id: "agree",
        value: "agree",
      },
      {
        id: "agree strongly",
        value: "stronglyAgree",
      },
    ]}
    innerPadding={9}
    axisTop={null}
    axisRight={{
      orient: "right",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendOffset: 0,
      truncateTickAt: 0,
    }}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Deportes",
      legendOffset: 36,
      legendPosition: "middle",
      truncateTickAt: 0,
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Estudiantes",
      legendOffset: -40,
      legendPosition: "middle",
      truncateTickAt: 0,
    }}
    margin={{ top: 40, right: 80, bottom: 100, left: 80 }}
    colors={{ scheme: "pink_yellowGreen" }}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 80,
        itemsSpacing: 0,
        itemWidth: 140,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "right-to-left",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "square",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

export default Marimekko;
