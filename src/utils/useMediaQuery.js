import useMediaQuery from "@mui/material/useMediaQuery";

const useQuery = () => {
  const matches = useMediaQuery("(min-width:800px)");

  return matches;
};

export default useQuery;
