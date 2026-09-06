import React from "react";
import teamMembers from "../data/team";
import TeamCard from "./TeamCard";

function TeamGrid({ featured }) {
    const displayed = featured
        ? teamMembers.filter(t => t.featured)
        : teamMembers;

    return (
        <div className="mt-24 px-6 md:px-10">
            <h2 className="text-center mb-12 text-3xl font-bold text-[rgba(37,43,66,1)]">
                Meet Our Team
            </h2>
            <p className="text-center mb-24 font-bold text-[rgba(115,115,115,1)]">Problems trying to resolve the conflict between <br />
                the two major realms of Classical physics: Newtonian mechanics</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
                {displayed.map((member) => (
                    <TeamCard key={member.id} {...member} />
                ))}
            </div>
        </div>
    );
}

export default TeamGrid;