class PartySparkleMonar {
    static async setup(runButton) {
        const res = await fetch(`./asset/image/monacoin/svg/monar.svg`)
        const svg = await res.text()
        const shape = document.createElement("span")
        shape.innerHTML = svg
        shape.querySelector(`svg`)
        console.debug(svg)
        const img = document.createElement("img")
        img.setAttribute('src', `./asset/image/monacoin/svg/monar.svg`)
        img.setAttribute('width', '32')
        img.setAttribute('height', '32')
        party.scene.current.createEmitter({
            emitterOptions: {
                loops: 1,
                useGravity: false,
                modules: [
                    new party.ModuleBuilder()
                        .drive("rotation")
                        .by((t) => new party.Vector(0, 0, 100).scale(t))
                        .relative()
                        .build(),
                ],
            },
            emissionOptions: {
                rate: 0,
                bursts: [{ time: 0, count: party.variation.range(30, 40), }],
                sourceSampler: party.sources.dynamicSource(runButton),
                angle: party.variation.range(0, 360),
                initialSpeed: 400,
                initialColor: party.variation.gradientSample(
                    party.Gradient.simple(party.Color.fromHex("#ffa68d"), party.Color.fromHex("#fd3a84"))
                ),
            },
            rendererOptions: {
                shapeFactory: img,
                applyLighting: undefined,
            },
        });
    }
}
