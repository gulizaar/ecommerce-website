import posts from "../data/post";
import PostCard from "./PostCard";

const FeaturedPosts = () => {
    return (
        <div className="mt-20">
            <div className="text-center mx-5
            ">
                <h6 className="text-[rgba(35,166,240,1)]">Practice Advice</h6>
                <h3 className="text-[rgba(37,43,66,1)]  font-bold
                ">Featured Posts</h3>
                <p className="text-[rgba(115,115,115,1)] font-montserrat font-bold">Problems trying to resolve the conflict between
                    <br></br>the two major realms of Classical physics: Newtonian mechanics </p>
            </div>
            <div className="flex flex-wrap gap-6 justify-center mt-10 ">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedPosts;