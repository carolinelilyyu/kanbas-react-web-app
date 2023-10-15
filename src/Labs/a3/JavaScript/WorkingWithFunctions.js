import ES5Functions from "./Functions/ES5Functions";
import ArrowFunctions from "./Functions/ArrowFunctions";
import ImpliedReturns from "./Functions/ImpliedReturns";
import FunctionParenthesisAndParameters from "./Functions/FunctionParenthesisAndParameters";
import WorkingWithArrays from "./Functions/WorkingWithArrays";
import ArrayIndexAndLength from "./Functions/ArrayIndexAndLength";
import ForLoops from "./Functions/ForLoops";
import MapFunction from "./Functions/MapFunction";
import JsonStringify from "./Functions/JsonStringify";
import FindFunction from "./Functions/FindFunction";
import FindIndex from "./Functions/FindIndex";
import FilterFunction from "./Functions/FilterFunction";
import TemplateLiterals from "./Functions/TemplateLiterals";
import House from "./Functions/House";
import Spread from "./Functions/Spread";
import Destructing from "./Functions/Destructing";
import FunctionDestructing from "./Functions/FunctionDestructing";

function WorkingWithFunctions(){
    return (
        <div>
            <ES5Functions />
            <ArrowFunctions />
            <ImpliedReturns />
            <FunctionParenthesisAndParameters />
            <WorkingWithArrays />
            <ArrayIndexAndLength />
            <ForLoops />
            <MapFunction />
            <JsonStringify />
            <FindFunction />
            <FindIndex />
            <FilterFunction />
            <TemplateLiterals />
            <House />
            <Spread />
            <Destructing/ >
            <FunctionDestructing />
        </div>
    );
}

export default WorkingWithFunctions;