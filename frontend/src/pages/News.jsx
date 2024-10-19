import { ArcticleCard, DailyNewsCard } from "../components/cards/NewsCard";
import news1 from "../assets/news/news1.jpg"
import news2 from "../assets/news/news2.jpg"
import news3 from "../assets/news/news3.jpeg"
import news4 from "../assets/news/news4.jpg"
import news5 from "../assets/news/news5.jpeg"


export const News = () => {
  return (
    <>
      <section className="md:ml-72  px-4 md:px-6 flex flex-col gap-3  md:gap-8 mb-16 md:mb-0 ">
        <div className="grid grid-cols-4 gap-5">
          <ArcticleCard 
            img={news1}
            date={"14/09/2024"}
            title={"Spirulina, Know its 7 Benefits for Body Health"}
            link={"https://www.alodokter.com/super-sehat-berkat-spirulina"}
          />
          <ArcticleCard 
            img={news2}
            date={"14/09/2024"}
            title={"11 Benefits of the Spirulina Plant for Body Health"}
            link={"https://www.halodoc.com/artikel/11-manfaat-tanaman-spirulina-untuk-kesehatan-tubuh"}
          />
          <ArcticleCard 
            img={news3}
            date={"14/09/2024"}
            title={"Various Benefits of Spirulina for Fish"}
            link={"https://cppetindo.com/pet-torial/manfaat-spirulina-untuk-ikan"}
          />
          <ArcticleCard 
            img={news4}
            date={"14/09/2024"}
            title={"Ministry of Industry Encourages Downstreaming of Spirulina and Porang"}
            link={"https://www.alodokter.com/super-sehat-berkat-spirulina"}
          />
  
        </div>
        <div>
          <h1 className="text-3xl font-medium mb-8">Daily Spirulina Article</h1>
          <DailyNewsCard 
               img={news5}
               date={"14/09/2024"}
               title={"Indonesia Potential Telling Spirulina"}
               link={"https://ugm.ac.id/id/berita/13282-indonesia-potensial-mengembangkan-spirulina/"}
          />
        </div>
      </section>
    </>
  );
};
