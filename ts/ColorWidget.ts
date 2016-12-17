declare const $: any;

//Generate colors when the document loads
var colors = [ 
	"#ddd", "#c0c0c0", "#999", "#555",
	"#cc00cc", "#a300cc", "#6300cc", "#4400cc",
	"#00bfff", "#0080ff", "#0040ff", "#0000ff",
	"#00ff00", "#00dd00", "#00bb00", "#009900",
	"#ffffb3", "#ffff00", "#fff200", "#ffe000",	
	"#ffbf00", "#ffb300", "#ff9000", "#ff6000",
	"#ff0000", "#e00000", "#cc0000", "#aa0000"				
	];		
for(var i=0; i < colors.length; i++) {
	$('#colortool').append($('<div>').css('background-color', colors[i]));
}

interface IColorable {
    changeColor(color: string): void;
    saveState(): void;
    resetState(): void;
}

class DOMTarget implements IColorable {
    private _DOMLocation: string;
    private _color: string;

    constructor(target: string, initColor: string) {
        this._DOMLocation = target;
        this._color = initColor;
    }

    get DOMLocation(): string { return this._DOMLocation; }
    set DOMLocation(value) { this._DOMLocation = value; }
    get color(): string { return this._color; }

    public changeColor(color: string): void {
        $(this.DOMLocation).css('background-color', color);
	}
	
	public saveState(): void {
		this._color = $(this.DOMLocation).css('background-color');
	}

    public resetState(): void {
        this.changeColor(this._color);
    }
}

class ColorSelector {
    private _me: string;
    private _targets: Array<DOMTarget>;
    private _color: string;

    constructor(me: string, targets: Array<DOMTarget>) {
        this._me = me;
        this._targets = targets;
    }

    get me() {
        return this._me;
    }
    public color(): string {
        return $(this.me).css('background-color');
    }

    public click(): void {
        let size: number = this._targets.length;
        for (var i=0; i<size; i++) {
            this._targets[i].saveState();
            this._targets[i].changeColor(this.color);
        }
	}
	
    public mouseenter(): void {
        let size: number = this._targets.length;
        for (var i=0; i<size; i++) {
		    this._targets[i].changeColor(this.color);
        }
	}

	public mouseleave(): void {
        let size: number = this._targets.length;
        for (var i=0; i<size; i++) {
            this._targets[i].resetState();
        }
	}
}

$(document).ready(function() {
    let colorableObject1: DOMTarget = new DOMTarget('#object', '#999');
    let colorTool1: ColorSelector = new ColorSelector('#colortool > div', [colorableObject1]);
	$(colorTool1.me).on('click', colorTool1.click)
    .on('mouseenter', colorTool1.mouseenter)
    .on('mouseleave', colorTool1.mouseleave);
});