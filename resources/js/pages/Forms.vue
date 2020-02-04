<template>
    <div>
        <section>
            <div class="columns">
                <div class="column">
                    <h2 class="title is-h2">Form Elements</h2>
                    <div class="field">
                        <b-checkbox>Basic</b-checkbox>
                    </div>
                    <b-field label="Input">
                        <b-input></b-input>
                    </b-field>
                    <b-field label="Select time">
                        <b-clockpicker
                            placeholder="Click to select..."
                            icon="clock"
                            hour-format="24">
                        </b-clockpicker>
                    </b-field>
                    <b-field label="Select a date">
                        <b-datepicker
                            :show-week-number="true"
                            placeholder="Click to select..."
                            icon="calendar-today">
                        </b-datepicker>
                    </b-field>
                    <b-field label="Daterange picker">
                        <b-datepicker
                            icon="calendar-today"
                            placeholder="Click to select..."
                            range>
                        </b-datepicker>
                    </b-field>
                    <b-field label="Numberinput">
                        <b-numberinput></b-numberinput>
                    </b-field>

                    <div class="block">
                        <b-field label="Radio"></b-field>
                        <b-radio v-model="radio"
                                 name="name"
                                 native-value="Flint">
                            Flint
                        </b-radio>
                        <b-radio v-model="radio"
                                 name="name"
                                 native-value="Silver">
                            Silver
                        </b-radio>
                        <b-radio v-model="radio"
                                 name="name"
                                 native-value="Jack">
                            Jack
                        </b-radio>
                        <b-radio v-model="radio"
                                 name="name"
                                 native-value="Vane"
                                 disabled>
                            Vane
                        </b-radio>
                    </div>
                    <b-field label="Rate">
                        <b-rate custom-text="With MDI" v-model="rate"></b-rate>
                        Rate: {{rate}}
                    </b-field>

                    <b-field label="Simple slider">
                        <b-slider v-model="slider"></b-slider>
                    </b-field>

                    <b-field label="Simple select">
                        <b-select placeholder="Select a name">
                            <option
                                v-for="option in data"
                                :value="option.id"
                                :key="option.id">
                                {{ option.name }}
                            </option>
                        </b-select>
                    </b-field>

                    <div class="field">
                        <b-field label="Switch"></b-field>
                        <b-switch v-model="isSwitched">
                            {{ isSwitched }}
                        </b-switch>
                    </div>

                    <b-field label="Tags">
                        <b-taginput
                            v-model="tags"
                            ellipsis
                            icon="label"
                            placeholder="Add a tag">
                        </b-taginput>
                    </b-field>
                </div>
                <div class="column">
                    <h2 class="title is-h2">Upload</h2>
                    <b-field>
                        <b-upload v-model="dropFiles"
                                  multiple
                                  drag-drop>
                            <section class="section">
                                <div class="content has-text-centered">
                                    <p>
                                        <b-icon
                                            icon="upload"
                                            size="is-large">
                                        </b-icon>
                                    </p>
                                    <p>Drop your files here or click to upload</p>
                                </div>
                            </section>
                        </b-upload>
                    </b-field>


                    <b-field>
                        <b-upload>
                            <a class="button is-primary">
                                <b-icon icon="upload"></b-icon>
                                <span>Click to upload</span>
                            </a>
                        </b-upload>
                    </b-field>

                    <div class="divider"></div>
                    <h2 class="title is-h2">Buttons</h2>
                    <section>
                        <div class="buttons">
                            <b-button type="is-primary">Primary</b-button>

                            <b-button type="is-success">Success</b-button>

                            <b-button type="is-danger">Danger</b-button>

                            <b-button type="is-warning">Warning</b-button>

                            <b-button type="is-info">Info</b-button>

                            <b-button type="is-link">Link</b-button>

                            <b-button type="is-light">Light</b-button>

                            <b-button type="is-dark">Dark</b-button>

                            <b-button type="is-text">Text</b-button>
                        </div>
                        <div class="buttons">
                            <b-button disabled>Disabled</b-button>

                            <b-button loading>Loading</b-button>

                            <b-button rounded>Rounded</b-button>
                        </div>

                        <div class="buttons">
                            <b-button type="is-primary" outlined>Outlined</b-button>
                            <b-button type="is-success" outlined>Outlined</b-button>
                            <b-button type="is-danger" outlined>Outlined</b-button>
                            <b-button type="is-warning" outlined>Outlined</b-button>
                        </div>

                        <div class="buttons">
                            <b-button type="is-primary" expanded>Expanded</b-button>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            radio: '',
            rate: 1,
            slider: 50,
            isSwitched: true,
            data: [
                {id: 1, name: 'Mike'},
                {id: 2, name: 'Nova'},
                {id: 3, name: 'Tesla'},
                {id: 4, name: 'Peter'},
            ],
            tags: [
                'Auckland',
                'Wellington',
                'Very long string that would overflow'
            ],
            dropFiles: []
        }
    },
    methods: {

    },
    created() {

    }
}
</script>
