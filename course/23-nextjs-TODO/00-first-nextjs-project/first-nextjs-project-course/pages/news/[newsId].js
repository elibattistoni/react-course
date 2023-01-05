//| NB with [] at the beginning of the filename, you tell NextJS (the [] is a special syntax!) that this is a DYNAMIC PATH!!!

//| NB in order to extract the concrete value entered in the URL when ethis page is loaded, we have a React Hook that we can use in functional components
import { useRouter } from "next/router";

const DetailsPage = (props) => {
  const router = useRouter();
  const newsId = router.query.newsId;
  // here you could send a request to the backend API to fetch some data about this specific news

  return <h1>The Details Page for news id: {newsId}</h1>;
};

export default DetailsPage;
