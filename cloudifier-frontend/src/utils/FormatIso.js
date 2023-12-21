const iso = [
  { name: "ubntu", image: "local:iso/ubuntu-22.04.3-live-server-amd64.iso" },
  { name: "centos", image: "local:iso/CentOS-8.4.2105-x86_64-dvd1.iso" },
];

const getImageName = (imageISO) => {
  const is = iso.filter((image) => image.image == imageISO);
  return is?.[0]?.name;
};
function FormatIso(images) {
  let formattedIso = [];
  for (let i = 0; i < images.length; i++) {
    let row = {};
    row["name"] = getImageName(images[i]);
    row["image"] = images[i];
    formattedIso.push(row);
  }
  return formattedIso;
}

export default FormatIso;
