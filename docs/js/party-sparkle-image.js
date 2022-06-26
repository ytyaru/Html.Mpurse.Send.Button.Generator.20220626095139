class PartySparkleImage {
    static async setup(runButton, options) {
        const img = document.createElement("img")
        img.setAttribute('src', options.src)
        img.setAttribute('width', options.size)
        img.setAttribute('height', options.size)
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
