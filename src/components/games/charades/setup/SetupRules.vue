<template>
    <div class="small-box rounded-xl pa-4" transition="slide-x-transition">
        <!-- Rounds to play -->
        <h3 class="text-center mb-3">Select rounds to play</h3>
        <div
        v-for="round in rules.rounds"
        :key=round.round
        class="flat my-2">
            <div class="d-flex justify-space-between" >
                <div class="mr-8">
                    <h4>{{round.text}}</h4>
                    <p class="roundDescription">{{round.explanation}}</p>
                </div>
                <div>
                    <v-switch 
                    v-model=round.value 
                    color="success"
                    @change="$emit('rulesChanged', rules)"
                    >
                    </v-switch>
                </div>
            </div>

        </div>

        <div class="my-8" v-if="false"></div>
        <!-- General rules -->
        <div 
            v-for="(setting, id) in rules.settings"
            :key=id
            v-show="false"
        >
            <v-divider v-if="id != 0"></v-divider>
            <v-row align="center">
                <v-col cols=10>
                {{setting.text}}
                </v-col>
                <v-col class="text-center">
                    <v-text-field 
                    v-model=setting.value
                    type="number"
                    solo
                    @input="$emit('rulesChanged', rules)"
                    ></v-text-field>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SetupCharadesRules',

    data(){
        return {
            rules: {
                settings: [
                    {
                        setting: "termsPerPerson",
                        text: "Terms per person",
                        value: 3,
                        type: 'number',
                    },
                    {
                        setting: "timeToGuess",
                        text: "Time to guess",
                        value: 60, //seconds,
                        type: 'number',
                    }
                ],
                rounds: [
                    {
                        round: "describe",
                        text: "Describe",
                        value: true,
                        explanation: "Describe the terms without mentioning them!",
                        icon: 'comment-bubble.svg',
                    },
                    {
                        round: "pantomime",
                        text: "Pantomime",
                        value: false,
                        explanation: "Mimic the terms given, no words allowed!",
                        icon: 'dance.svg',
                    },
                    {
                        round: "oneWord",
                        text: "1 Word",
                        value: false,
                        explanation: "Use only 1 word to describe each term and 1 word only!",
                        icon: 'gun.svg',
                    },
                    {
                        round: "puppetmaster",
                        text: "Puppetmaster",
                        value: false,
                        explanation: "Use an adversary as a puppet to let him mimic the terms!",
                        icon: 'puppet.svg',
                    },
                    {
                        round: "drawing",
                        text: "Drawing",
                        value: false,
                        explanation: "Draw the terms without writing any words!",
                        icon: 'illustration.svg',
                    },
                    {
                        round: "noises",
                        text: "Make some noise",
                        value: true,
                        explanation: "Use only sound effects and melodies to describe the terms!",
                        icon: 'chicken-rooster.svg',
                    },
                ]
            }
        }
    },
    mounted(){
        this.$emit('rulesChanged', this.rules)
    }
}
</script>


<style scoped>
    .flat{
        max-height: 60px;
    }

    .roundDescription{
        margin-top: -2px;
        font-size: 0.8em;
        color: var(--v-background-darken3);
        line-height: 1.2em;
    }
</style>