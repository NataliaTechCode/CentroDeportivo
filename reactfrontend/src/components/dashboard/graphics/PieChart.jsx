import { ResponsivePie } from "@nivo/pie";

const Pie = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    activeOuterRadiusOffset={8}
    colors={{ scheme: "category10" }}
    borderWidth={4}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsTextOffset={15}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsDiagonalLength={23}
    arcLinkLabelsStraightLength={30}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsRadiusOffset={0.45}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", "3"]],
    }}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
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

export default Pie;
