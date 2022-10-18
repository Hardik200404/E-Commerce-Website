let {sum,check_a}=require('../testfunctions/sumfunction');

test('test sum function',()=>{
    expect(sum(2,3)).toEqual(5);
    expect(sum(58,12)).toEqual(70);
    expect(sum(35,7)).toEqual(42);
    expect(sum(8,6)).toEqual(14);
    expect(sum(124,100)).toEqual(224);
    expect(check_a(2)).toBeTruthy();
    expect(check_a(4)).toBeFalsy();
})