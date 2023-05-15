export const dataConverter = (dataJSON) => {
  const convertedData = {
    number: Number(dataJSON.number),
    id: dataJSON.id,
  };
};

interface ILocationData {
  code: string;
  city: string;
  adress: string;
  voivodeship: string;
}

export const stringDivide = (locationString: string): ILocationData => {
  const locationArray = locationString.replace(/,/g, "").split("\n");

  switch (locationArray.length) {
    case 2:
      return {
        code: locationArray[0].split(" ")[0],
        city: locationArray[0].split(" ")[1],
        adress: "none",
        voivodeship: locationArray[1],
      };

    case 3:
      return {
        code: locationArray[0].split(" ")[0],
        city: locationArray[0].split(" ")[1],
        adress: locationArray[1],
        voivodeship: locationArray[2],
      };
    default:
      return {
        code: "none",
        city: "none",
        adress: "none",
        voivodeship: "none",
      };
  }
};
