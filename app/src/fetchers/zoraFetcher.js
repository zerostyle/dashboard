import { request, gql } from "graphql-request";
import _ from "lodash";

const nounsQuery = gql`
    query NounsStatsQuery {
        mints(
            where: {
                collectionAddresses: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03"
            }
            pagination: { limit: 500 }
        ) {
            nouns: nodes {
                mint {
                    transactionInfo {
                        transactionHash
                        blockTimestamp
                    }
                    tokenId
                }
                token {
                    metadata
                }
            }
        }
    }
`;

export const getNounsData = async () => {
    const response = await request("https://api.zora.co/graphql", nounsQuery);

    const nouns = response.mints.nouns;
    const nonFounderNouns = nouns.filter((noun) => {
        return +noun.mint.tokenId % 10 !== 0; // Every 10th Noun goes directly to the founders e.g. 0,10,20,30...
    });
    const groupedNonFounderNouns = _.groupBy(nonFounderNouns, (noun) => {
        return noun.mint.transactionInfo.blockTimestamp;
    });
    return groupedNonFounderNouns;
};
