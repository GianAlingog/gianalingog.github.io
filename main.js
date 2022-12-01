let activeIndex = 0;

const groups = document.getElementsByTagName("article");

const handleRightClick = () => {
  const nextIndex = activeIndex + 1 <= groups.length - 1 ? activeIndex + 1 : 0;

  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`);
  const nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);

  currentGroup.dataset.status = "inactive";
  nextGroup.dataset.status = "active";

  activeIndex = nextIndex;
};

const handleLeftClick = () => {
  const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : groups.length - 1;

  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`);
  const nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);

  currentGroup.dataset.status = "inactive";
  nextGroup.dataset.status = "active";
  
  activeIndex = nextIndex;
}

const handleNavClick = (dataIndex) => {
  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`);
  const nextGroup = document.querySelector(`[data-index="${dataIndex}"]`);

  currentGroup.dataset.status = "inactive";
  nextGroup.dataset.status = "active";
  
  activeIndex = dataIndex;
}
