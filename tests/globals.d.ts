import ExpectStatic = Chai.ExpectStatic;

declare namespace NodeJS {
    import ExpectStatic = Chai.ExpectStatic;

    export interface Global {
        expect: ExpectStatic
    }
}

declare const expect: ExpectStatic;
