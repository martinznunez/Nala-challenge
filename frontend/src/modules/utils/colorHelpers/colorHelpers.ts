export const getZebraStripedColor = (index: number) => {
    const colors = [  "#e0e0e0", '#f1f1f1', ]; 
    return colors[index % 2]; 
  };
  