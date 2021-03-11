
const INTERVAL_TYPE = Object.freeze({
    MINOR_SECOND: "Minor Second",
    MAJOR_SECOND: "Major Second",
    MINOR_THIRD: "Minor Third",
    MAJOR_THIRD: "Major Third",
    PERFECT_FOURTH: "Fourth",
    TRITONE: "Tritone",
    PERFECT_FIFTH: "Fifth",
    MINOR_SIXTH: "Minor Sixth",
    MAJOR_SIXTH: "Major Sixth",
    MINOR_SEVENTH: "Minor Seventh",
    MAJOR_SEVENTH: "Major Seventh",
    OCTAVE: "Octave"
});

const INTERVAL_PLAY_TYPE = Object.freeze({
    ASCENDING: "Ascending",
    DESCENDING: "Descending",
    HARMONIC: "Harmonic"
});

class Interval {

    constructor(type, note, play_type) {
        this.type = type;
        this.lower_note = note;
        this.delay_in_ms = 500;
        this.play_type = play_type;
        this.audio_file_name = Interval.get_audio_filename(this.type)

        var higher_note_index = note.note_value + Interval.get_interval_step(this.type);
        if(higher_note_index <= 128)
            this.higher_note = all_notes[higher_note_index];
        else
            logE("todo: out of bounds error")
    }

    to_string() {
        return  "INTERVAL: " + this.type + ": " + this.lower_note.to_string() + " - " + this.higher_note.to_string();
    }

    is_within_range(min, max){
        return this.lower_note.note_value >= min && this.lower_note.note_value <= max && this.higher_note.note_value >= min && this.higher_note.note_value <= max
    }
}

Interval.get_interval_step = function(type){

    switch(type){
        case INTERVAL_TYPE.MINOR_SECOND:
            return 1;
        case INTERVAL_TYPE.MAJOR_SECOND:
            return 2;
        case INTERVAL_TYPE.MINOR_THIRD:
            return 3;
        case INTERVAL_TYPE.MAJOR_THIRD:
            return 4;
        case INTERVAL_TYPE.PERFECT_FOURTH:
            return 5;
        case INTERVAL_TYPE.TRITONE:
            return 6;
        case INTERVAL_TYPE.PERFECT_FIFTH:
            return 7;
        case INTERVAL_TYPE.MINOR_SIXTH:
            return 8;
        case INTERVAL_TYPE.MAJOR_SIXTH:
            return 9
        case INTERVAL_TYPE.MINOR_SEVENTH:
            return 10
        case INTERVAL_TYPE.MAJOR_SEVENTH:
            return 11
        case INTERVAL_TYPE.OCTAVE:
            return 12;
    }
}

Interval.get_audio_filename = function(type){

    switch(type){
        case INTERVAL_TYPE.MINOR_SECOND:
            return "audio/intervals/minor_second.mp3";
        case INTERVAL_TYPE.MAJOR_SECOND:
            return "audio/intervals/major_second.mp3";
        case INTERVAL_TYPE.MINOR_THIRD:
            return "audio/intervals/minor_third.mp3";
        case INTERVAL_TYPE.MAJOR_THIRD:
            return "audio/intervals/major_third.mp3";
        case INTERVAL_TYPE.PERFECT_FOURTH:
            return "audio/intervals/fourth.mp3" ;
        case INTERVAL_TYPE.TRITONE:
            return "audio/intervals/tritone.mp3";
        case INTERVAL_TYPE.PERFECT_FIFTH:
            return "audio/intervals/fifth.mp3";
        case INTERVAL_TYPE.MINOR_SIXTH:
            return "audio/intervals/minor_sixth.mp3";
        case INTERVAL_TYPE.MAJOR_SIXTH:
            return "audio/intervals/major_sixth.mp3";
        case INTERVAL_TYPE.MINOR_SEVENTH:
            return "audio/intervals/minor_seventh.mp3";
        case INTERVAL_TYPE.MAJOR_SEVENTH:
            return "audio/intervals/major_seventh.mp3";
        case INTERVAL_TYPE.OCTAVE:
            return "audio/intervals/octave.mp3";
    }
}

function createRandomInterval(min, max){

    var rand = randomIntFromInterval(0,model.interval.types.length-1);
    var type = model.interval.types[rand];
    
    var note = generate_random_note(min, max);

    var rand = randomIntFromInterval(0,model.interval.play_types.length-1);
    var play_type = model.interval.play_types[rand];

    var interval = new Interval(type, note, play_type);

    while(!interval.is_within_range(min, max)){
        note = generate_random_note(min, max);
        interval = new Interval(type, note, play_type);
    }

    return interval;
}
