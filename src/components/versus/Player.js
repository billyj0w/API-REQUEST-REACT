function Player (props){
    return(
        <>
            <div className='pokemonInfo'>
                <div className='pokemonCard' style={{ backgroundColor: `${props.color}` }}>
                    {props.data.map(({ name, sprites, stats, types, id }) => {
                        return (
                            <>
                                <div className='sprite' key={id}>
                                    <h3>{name}</h3>
                                    <img src={`${sprites.front_default}`} />
                                </div>
                                <div className='status'>
                                    <h3>Type</h3>
                                    {types.map(({ type }) => {
                                        return (
                                            <div className='statusItem'>
                                                <p>{type.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Player;