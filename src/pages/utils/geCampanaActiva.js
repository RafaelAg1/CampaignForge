export function getCampanaActiva (campaigns,characters){
    let masActiva = null
    let maxCount = 0

    for (const campana of campaigns) {
        const count = characters.filter((c) => c.campaignId === campana.id).length

        if (count>maxCount){
            maxCount = count;

            masActiva = {...campana, characterCount: count}
        }
    }
    return masActiva

}

export const deleteCampaign = ({campaigns,setCampaigns, id}) => {
    const updated = campaigns.filter(c => c.id !== id);
    setCampaigns(updated);
    localStorage.setItem("campaigns", JSON.stringify(updated))

    const characters = JSON.parse(localStorage.getItem("characters") || "[]")
    const updatedCharacters = characters.filter(c => c.campaignId !== id)
    localStorage.setItem("characters", JSON.stringify(updatedCharacters))


}
